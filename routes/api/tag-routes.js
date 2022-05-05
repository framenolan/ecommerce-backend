const router = require('express').Router();
const res = require('express/lib/response');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include:[{
      model:Product
    }]
  })
  .then(dbTags => {
    res.json(dbTags)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({msg: "an error occurred", err})
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id,{
    include:[Product]
  })
  .then(dbTags => {
    res.json(dbTags)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occurred", err });
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(newTag => {
    res.json(newTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occurred", err });
  });
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedTag => {
    res.json(updatedTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occurred", err });
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(delTag => {
    res.json(delTag)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occurred", err });
  });
});

module.exports = router;
