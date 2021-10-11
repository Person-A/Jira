import {
  useEffect, useState
} from "react"
export const isFalsy = (value) => value === 0 ? false : !value
export const cleanObject = (object) => {
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

export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}
export const useDebounce=(value,delay)=>{
  const [debounceValue,setDebounceValue]=useState(value);
  useEffect(()=>{
    // 每次在value变化之后，设置一个定时器
    const timeOut=setTimeout(()=>setDebounceValue(value),delay)
    // 每次在上一个useEffect处理完了再运行
    return ()=>clearTimeout(timeOut)
  },[value,delay])
  return debounceValue
}