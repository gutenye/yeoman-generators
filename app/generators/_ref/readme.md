```
const res = await api.post('/login', {body})
if (res.err)
  console.log(res.err.message)

{
  posts(orderBy: "a", page: 1, limit: 1) {
    id
  }
}
```
