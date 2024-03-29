const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	try {
		const tagData = await Tag.findAll({
			include: [Product],
		});
		res.json(tagData);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

router.get('/:id', async (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	try {
		const tagData = await Tag.findByPk(req.params.id, {
			include: [Product],
		});
		if (tagData === null) {
			return res.status(404).json({ msg: 'no such tag exists!' });
		}
		res.json(tagData);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

router.post('/', async (req, res) => {
	// create a new tag
	try {
		const tag = await Tag.create({
			tag_name: req.body.tag_name,
		});
		res.status(201).json(tag);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

router.put('/:id', async (req, res) => {
	// update a tag's name by its `id` value
	try {
		const tagData = await Tag.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.json(tagData);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

router.delete('/:id', async (req, res) => {
	// delete on tag by its `id` value
	try {
		const tag = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (tag === 0) {
			return res.status(404).json({ msg: 'no such category exists!' });
		}
		res.json(tag);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

module.exports = router;
