import React from "react"
import { useState, useEffect } from 'react'
import qs from 'qs'
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { cleanObject, useDebounce, useMount } from '../../utils'

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: '',
    personId: ''
  })
  const debounceParams=useDebounce(params,1000)
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParams))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debounceParams])
  return <div>
    <SearchPanel params={params} setParams={setParams} users={users} />
    <List list={list} users={users} />
  </div>
}