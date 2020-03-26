const extend = (a, b) => {
  return Object.assign({}, a, b);
};
const extendArray = (a, b) => {
  return a.concat(b);
};


const a = {
  name: 'Mike',
  age: 27,

}

const b = {
  profession: 'manager',
  status: 'single'
}


console.log(extend(a,b))
