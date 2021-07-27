const express = require('express')
const axios = require('axios')

const app = express()
const PORT = 5000

app.use(express.json())
app.use(express.static("public"))


async function getLink(videoURL){
    console.log(videoURL)
    try {

        let res = await axios.get(videoURL)
        let link = res.data.split('hd_src:"')[1].split('",')[0]
        console.log(link)
        return {
            status : "success",
            link : link
        }
    } catch (error) {
        console.log(error)
        return {
            status : "error",
            link : null
        }

    }

}

app.get("/download", async function (req,res){
    let url = req.query.videoURL;
    let data = await getLink(url)
    res.json(data)
})


app.listen(PORT, () => {
    console.log(`Listening, PORT : ${PORT} `)
})