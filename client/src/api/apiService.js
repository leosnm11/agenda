import http from '../http-common.js';

async function getDateEvent(date) {
  try {
    const res = await http.get(`/v1/api/agenda?period=${date}`);
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function getEvent() {
  try {
    const res = await http.get(`/v1/api/agenda`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
async function getListEvent() {
  try {
    const res = await http.get(`/v1/api/agenda/eventos`);
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function getUser(filter) {
  try {
    const res = await http.get(`/v1/api/agenda/user?distinct=${filter}`);
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function deleteOne(id) {
  return await http.delete(`/v1/api/agenda/${id}`);
}

async function updateEvent(id, data) {
  const res = await http.put(`/v1/api/agenda/${id}`, data);
  return res;
}

async function createEvent(data) {
  const res = await http.post('/v1/api/agenda/', data);
  return res;
}

export {
  getListEvent,
  getDateEvent,
  getEvent,
  deleteOne,
  updateEvent,
  createEvent,
  getUser,
};
