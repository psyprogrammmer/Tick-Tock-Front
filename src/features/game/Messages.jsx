export default function isBlank(params) {
  for (const i of params) {
    if(i!=""){
      return false;
    }
  }
  return true;
}

