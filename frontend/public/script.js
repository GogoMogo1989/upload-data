const formComponent = `
    <form id="form">
        <input type="text" name="title">
        <input type="file" name="picture">
        <button>Send</button>
    </form>

`


function loadEvent(){

    const rootElement = document.getElementById("root")

    rootElement.insertAdjacentHTML("beforeend", formComponent)

    const form = document.getElementById("form")
    form.addEventListener("submit", e => {
        e.preventDefault(); 

        const formData = new FormData();
        formData.append("title", e.target.querySelector(`input[name="title"]`).value)
        formData.append("picture", e.target.querySelector(`input[name="picture"]`).files[0])

        const fetchSettings= {
            method: "POST",
            body: formData
        }

        fetch("/", fetchSettings )
            .then(async data =>{
                if(data.status === 200){
                    const response = await data.json()
                    e.target.outerHTML =`<img src="upload/${response.pictureName}">`
                    console.dir(data)
                }
            })
            .catch(error => {
                e.target.outerHTML = "Error"
                console.log(error)
            })
    })

}

window.addEventListener("load", loadEvent )