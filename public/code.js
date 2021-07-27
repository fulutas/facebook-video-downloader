document.querySelector("#download-btn").addEventListener('click', async function() {

    let videoURL = document.querySelector("#video-url").value;
    if(videoURL.length == 0){
        return;
    }

    // document.querySelector(".loader").classList.add("active")

    let res = await axios({
        method : "GET",
        responseType : "json",
        url : "http://localhost:5000/download?videoURL="+videoURL
    });

    console.log(res)

    // document.querySelector(".loader").classList.remove("active")

    if(res.data.status == "success"){

        let videoRes = await axios({
            method : "GET",
            responseType : "blob",
            url : res.data.link
        });

        download(new Blob([videoRes.data]), "fb_video.mp4");

    } else {
        alert("Something went wrong, please try again.")
    }
})