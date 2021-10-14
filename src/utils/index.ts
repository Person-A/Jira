import {
  useEffect, useState
} from "react"
export const isFalsy = (value:unknown) => value === 0 ? false : !value
export const cleanObject = (object:any) => {
  const result = {
    ...object
  }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback:()=>void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce=<V>(value:V,delay?:number)=>{
  const [debounceValue,setDebounceValue]=useState(value);
  useEffect(()=>{
    // 每次在value变化之后，设置一个定时器
    const timeOut=setTimeout(()=>setDebounceValue(value),delay)
    // 每次在上一个useEffect处理完了再运行
    return ()=>clearTimeout(timeOut)
  },[value,delay])
  return debounceValue
}