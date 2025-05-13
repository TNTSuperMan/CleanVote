export const turnstileErrorMSG = (data: string): string => {
  const arr = JSON.parse(data);
  if(Array.isArray(arr)){
    return `Turnstileエラー: ${arr.map(e=>{
      switch(e){
        case "invaild-input-response": return "認証形式が間違っています";
        case "timeout-or-duplicate": return "認証の有効期限が切れました";
        case "internal-error": return "内部エラーが発生しました";
        default: return e;
      }
    }).join("、")}`
  }else return data;
}
