import axios from "axios";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_HISTORY_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
} from "./ActionType";
import api from "../../../config/api";

export const createOrder = (reqData) => async (dispatch) => {
  
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
        "Content-Type": "application/json"
      }
    };
    const { data } = await api.post(
      `/api/orders/`,
      reqData.address,config
    );
    
    if (data._id) {
      reqData.navigate({ search: `step=3&order_id=${data._id}` });
    }
    console.log("created order - ", data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch error sd: ", error);
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  console.log("get order req ", orderId);
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
   
    const { data } = await api.get(
      `/api/orders/${orderId}`,
      
    );
    console.log("order by id ", data);
    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch ",error)
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderHistory = (reqData) => async (dispatch, getState) => {
  dispatch({ type: GET_ORDER_HISTORY_REQUEST });
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    };

    const { data } = await api.get(`/api/orders/user` ,config
    );
    console.log("order history -------- ", data);
    dispatch({
      type: GET_ORDER_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_HISTORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
