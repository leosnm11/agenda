import ageModel from '../database/models/agenda.js';

const allFind = async (req, res) => {
  const periodControl = req.query.period;
  let condition = periodControl
    ? {
        mes: periodControl,
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

const createEvent = async (req, res) => {
  const newEvent = req.body;
  let separacao = newEvent.data.split('-');
  let year = separacao[0];
  let month = separacao[1];
  let yearMonth = `${year}-${month}`;
  let event = newEvent.event;
  let data = newEvent.data;
  let user = newEvent.user;
  let tn = newEvent.tn;
  try {
    const newDateEvent = await new ageModel({
      event: event,
      data: data,
      mes: yearMonth,
      ano: year,
      user: user,
      tn: tn,
    });
    await newDateEvent.save();
    await res
      .status(201)
      .send({ message: `Evento "${event}" cadastrado com sucesso!` });
    console.log(
      `POST /v1/api/agenda - Evento "${event}" cadastrado com sucesso!`
    );
  } catch (err) {
    await res
      .status(500)
      .json({ message: `${err} 'Erro ao listar documentos'` });
    console.log(`GET /v1/api/agenda - ${JSON.stringify(err)}`);
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

export default { allFind, updateOne, createEvent, deleteOne };
