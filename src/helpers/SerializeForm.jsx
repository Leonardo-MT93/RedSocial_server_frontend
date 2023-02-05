export const SerializeForm = (form) => {
    const formData = new FormData(form);

    const completeObj = {};

    for(let [name, value] of formData){ //Desustructuracion de valores
        completeObj[name] = value;
    };
    return completeObj;
}