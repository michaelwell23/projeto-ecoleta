import knex from '../database/connection';

class PointsController {
  async index(request, response) {
    const { city, uf, items } = request.query;

    const parssedItems = String(items)
      .split(', ')
      .map((item) => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parssedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedItems = items.map((point) => {
      return {
        ...point,
        image_url: `http://192.168.0.45:3333/uploads/images/${point.image}`,
      };
    });

    return response.json(serializedItems);
  }

  async show(request, response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Point not found.' });
    }

    const serializedItem = {
      ...point,
      image_url: `http://192.168.0.45:3333/uploads/images/${point.image}`,
    };

    const items = await knex('items')
      .join(`point_items`, 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return response.json({ point: serializedItem, items });
  }

  async create(request, response) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } =
      request.body;

    const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
