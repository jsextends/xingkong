let start = 1000000000;
export function uuid(){
    start++;
    const res= start.toString(16).replace(/.{4}/g, $1 => $1 + "_");
    if(res[res.length -1] === "_"){
        return res.slice(0, -1)
    } 
    return res
}