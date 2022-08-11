import { toast } from "react-toastify";

export const notify = (msg: string, detail = "") => {
  switch (detail) {
    case "":
      toast.error(msg);
      return;
    case "info":
      toast.info(msg);
  }
};

interface IData {
  app: string;
  value: any;
  ttl: number;
}

/**
 * code copied from https://digitalfortress.tech/js/localstorage-with-ttl-time-to-expiry/
 * then modified.
 *
 * @param {string} appName - To ignore variable stored by other programs
 * @param {string} keyName - A key to identify the value.
 * @param {any} keyValue - A value associated with the key.
 * @param {number} ttl- Time to live in seconds.
 */
export const set = (keyName: string, keyValue: any, ttl: number) => {
  const data: IData = {
    app: process.env.REACT_APP_APP_NAME as string,
    value: keyValue, // store the value within this object
    ttl: Date.now() + ttl, // store the TTL (time to live)
  };

  // store data in LocalStorage
  localStorage.setItem(keyName, JSON.stringify(data));
};

/**
 * code copied from https://digitalfortress.tech/js/localstorage-with-ttl-time-to-expiry/
 * then modified.
 *
 * @param {string} keyName - A key to identify the data.
 * @returns {any|null} returns the value associated with the key if its exists and is not expired. Returns `null` otherwise
 */
export const get = (keyName: string) => {
  const data = localStorage.getItem(keyName);
  if (!data) {
    // if no value exists associated with the key, return null
    return null;
  }

  const item: IData = JSON.parse(data);

  if (!item?.app || item.app !== process.env.REACT_APP_APP_NAME) {
    localStorage.clear();
  }

  if (Date.now() > item.ttl) {
    // If TTL has expired, remove the item from localStorage and return null
    localStorage.removeItem(keyName);
    return null;
  }

  // return data if not expired
  if (item.value?.token) return item.value.token;
  return item.value;
};
