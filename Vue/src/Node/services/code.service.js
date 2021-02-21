import fs from "fs";

const generateCode = (lenght) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const codeService = () => {
  const storage = [];

  const getStorage = () => {
    return storage;
  };

  const deleteFromCodeStorage = (code, filePath) => {
    setTimeout(() => {
      const index = storage.findIndex((x) => x.code === code);
      storage.splice(index, 1);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err + filePath);
        }
      });
    }, 7200);
  };

  const addToStorage = (outputTitle, filePath) => {
    const code = generateCode(32);
    const payload = { code: code, path: outputTitle };

    storage.push(payload);
    deleteFromCodeStorage(code, filePath);

    return code;
  };

  return {
    getStorage,
    addToStorage
  }
};

export { codeService };
