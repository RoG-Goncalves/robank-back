import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import gradeModel from '../models/gradeModel.js'

const create = async (req, res) => {
  const { name, subject, type, value } = req.body;
  const grade = new gradeModel({
    name,
    subject,
    type,
    value
  })
  try {
    const data = await grade.save((err) => {
      if (err) {
        throw err;
      }
    });
    res.send(data);
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const grades = await gradeModel.find(condition);
    res.send(grades);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await gradeModel.findById({ _id: id })
    logger.info(`GET /grade - ${id}`);
    if (!data) {
      res.status(404).send('Nao encontrado nenhum registro');
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await gradeModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(400).send(
        'Dados para atualizacao vazio'
      );
    } else {
      res.send(data)
    }
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    const data = await gradeModel.findByIdAndRemove({ _id: id });
    if (!data) {
      return res.status(400).send(
        'Dados para atualizacao vazio'
      );
    } else {
      res.send('Registro deletado com sucesso');
    }
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const data = await gradeModel.deleteMany();
    if (!data) {
      return res.status(400).send(
        'Dados para atualizacao vazio'
      );
    } else {
      res.send('Registro deletado com sucesso');
    }
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
