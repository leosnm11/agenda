import ageModel from '../database/models/agenda.js';
import eveModel from '../database/models/eventos.js';

const allFind = async (req, res) => {
  const periodControl = req.query.period;
  let condition = periodControl
    ? {
        doc: { data: periodControl },
      }
    : {};
  try {
    const all = await ageModel.find(condition);
    console.log(
      `GET /v1/api/agenda ${
        periodControl
          ? '- Periodo ' + periodControl
          : '- Toda a agenda consultada'
      }`
    );
    await res.status(200).send(all);
  } catch (err) {
    await res
      .status(500)
      .json({ message: `${err.message} 'Erro ao listar documentos'` });
    console.log(`GET /v1/api/agenda - ${JSON.stringify(err)}`);
  }
};
const findDistinctUser = async (req, res) => {
  const filter = req.query.distinct;
  try {
    const all = await ageModel.distinct(filter);
    console.log(`GET /v1/api/agenda`);
    await res.status(200).send(all);
  } catch (err) {
    await res
      .status(500)
      .json({ message: `${err.message} 'Erro ao listar documentos'` });
    console.log(`GET /v1/api/agenda - ${JSON.stringify(err)}`);
  }
};

const createEvent = async (req, res) => {
  const newEvent = req.body;
  let doc = [];
  let user = newEvent.user;
  let turno = newEvent.turno;
  let color = newEvent.color;
  try {
    let newDateEvent;
    const findUser = await ageModel.find();

    const exist = findUser.find((u) => {
      return u.user === user;
    });

    console.log(newEvent);
    if (!exist) {
      if (newEvent.doc.length > 1) {
        for (let i = 0; i < newEvent.doc.length; i++) {
          doc.push({ ...newEvent.doc[i] });
        }
      } else {
        doc.push(newEvent.doc[0]);
      }
      newDateEvent = await new ageModel({
        user: user,
        turno: turno,
        color: color,
        doc: doc,
      });
      await newDateEvent.save();
    } else {
      if (exist.doc.length > 1) {
        if (newEvent.doc.length > 1) {
          for (let i = 0; i < newEvent.doc.length; i++) {
            exist.doc.push({ ...newEvent.doc[i] });
          }
        } else {
          doc.push(newEvent.doc[0]);
        }
        await ageModel.findOneAndUpdate(
          { user: exist.user },
          {
            $set: exist,
          },
          { new: true }
        );
      } else {
        if (newEvent.doc.length > 1) {
          for (let i = 0; i < newEvent.doc.length; i++) {
            exist.doc.push({ ...newEvent.doc[i] });
          }
        } else {
          doc.push(newEvent.doc[0]);
        }
        await ageModel.findOneAndUpdate(
          { user: exist.user },
          {
            $set: exist,
          },
          { new: true }
        );
      }
    }
    await res.status(201).send({ message: `Evento realizado com sucesso!` });
    console.log(`POST /v1/api/agenda - Evento realizado com sucesso!`);
  } catch (err) {
    await res
      .status(500)
      .json({ message: `${err} 'Erro ao listar documentos'` });
    console.log(`POST /v1/api/agenda - ${err}`);
  }
};

const updateOne = async (req, res) => {
  const idEvent = req.params.id;
  const body = req.body;
  let separacao = body.data.split('-');
  let year = separacao[0];
  let month = separacao[1];
  let yearMonth = `${year}-${month}`;
  let event = newEvent.event;
  let data = newEvent.data;
  let user = newEvent.user;
  let tn = newEvent.tn;
  try {
    await ageModel.findOneAndUpdate(
      {
        _id: idEvent,
      },
      {
        event: event,
        data: data,
        mes: yearMonth,
        ano: year,
        user: user,
        tn: tn,
      },
      { new: true }
    );
    await res.status(200).send({ message: `Evento ${event} foi atualizado` });
  } catch (error) {
    await res
      .status(500)
      .json({ message: `${err} 'Erro ao atualizar documentos'` });
    console.log(`GET /v1/api/agenda - ${JSON.stringify(err)}`);
  }
};

const findEventos = async (req, res) => {
  try {
    const allEvent = await eveModel.find({});
    await res.status(200).send(allEvent);
  } catch (err) {
    await res
      .status(500)
      .json({ message: `${err} 'Erro ao listar documentos'` });
    console.log(`POST /v1/api/agenda - ${err}`);
  }
};

const createTypeEvent = async (req, res) => {
  let evento = req.body;
  try {
    const findAtividades = await eveModel.find(evento);
    if (findAtividades.length === 0) {
      const newEvent = new eveModel(evento);
      await newEvent.save();
      await res.status(201).send({ message: `Evento realizado com sucesso!` });
    } else {
      await res.status(201).send({ message: `Atividade já existe!` });
    }
  } catch (err) {
    await res
      .status(500)
      .json({ message: `${err} 'Erro ao listar documentos'` });
    console.log(`POST /v1/api/agenda - ${err}`);
  }
};

const deleteOne = async (req, res) => {
  const idEvent = req.params.id;
  try {
    const isDelete = await ageModel.findOneAndDelete({ _id: idEvent });
    if (!isDelete) {
      res
        .status(400)
        .send(
          `Documento não encontrado na coleção id informado: ${req.params.id}`
        );
    } else {
      await res.status(200).send({ message: `Evento excluído com sucesso!` });
    }
  } catch (error) {
    await res
      .status(500)
      .json({ message: `${err} 'Erro ao excluir documentos'` });
    console.log(`DELETE /v1/api/agenda - ${JSON.stringify(err)}`);
  }
};
const deleteOneEvent = async (req, res) => {
  const idEvent = req.params.id;
  try {
    const isDelete = await eveModel.findOneAndDelete({ _id: idEvent });
    if (!isDelete) {
      res
        .status(400)
        .send(
          `Documento não encontrado na coleção id informado: ${req.params.id}`
        );
    } else {
      await res.status(200).send({ message: `Evento excluído com sucesso!` });
    }
  } catch (error) {
    await res
      .status(500)
      .json({ message: `${err} 'Erro ao excluir documentos'` });
    console.log(`DELETE /v1/api/agenda - ${JSON.stringify(err)}`);
  }
};

export default {
  findEventos,
  createTypeEvent,
  allFind,
  updateOne,
  createEvent,
  deleteOne,
  findDistinctUser,
  deleteOneEvent,
};
