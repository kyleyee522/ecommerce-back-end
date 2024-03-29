const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
	// find all categories
	// be sure to include its associated Products
	try {
		const categoryData = await Category.findAll({
			include: [Product],
		});
		res.json(categoryData);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

router.get('/:id', async (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	try {
		const categoryData = await Category.findByPk(req.params.id, {
			include: [Product],
		});
		if (categoryData === null) {
			return res.status(404).json({ msg: 'no such tank exists!' });
		}
		res.json(categoryData);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

router.post('/', async (req, res) => {
	// create a new category
	try {
		const category = await Category.create({
			category_name: req.body.category_name,
		});
		res.status(201).json(category);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

router.put('/:id', async (req, res) => {
	// update a category by its `id` value
	try {
		const category = await Category.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		// console.log(category);
		res.json(category);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

router.delete('/:id', async (req, res) => {
	// delete a category by its `id` value
	try {
		const category = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (category === 0) {
			return res.status(404).json({ msg: 'no such Category exists!' });
		}
		res.json(category);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

module.exports = router;
