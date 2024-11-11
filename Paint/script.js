const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const inputColor = document.querySelector(".input__color")
const tools = document.querySelectorAll(".button__tool")
const sizeButtons = document.querySelector(".button__size")
const buttonClear = document.querySelector(".button__clear")

let brushSize = 30



let ispainting = false

let activetool ="brush"

inputColor.addEventListener("change", ({target}) =>{
    ctx.fillStyle = target.value

})

canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
    ispainting = true
    if (activetool == "brush") {
        draw(clientX, clientY)

    }

    if (activetool == "rubber") {
        erase(clientX, clientY)

    }
})

canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
    if (ispainting) {
    draw(clientX, clientY)
    if (activetool == "brush") 
        draw(clientX, clientY)
    }

    if (activetool == "rubber") {
        erase(clientX, clientY)

    }
})

canvas.addEventListener("mouseup", ({ clientX, clientY }) => {
    ispainting = false
})




const draw = (x, y) => {

    ctx.globalCompositeOperation = "source-over"

    ctx.beginPath()

    ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 2 * Math.PI)
    ctx.fill()

    

}

const erase = (x, y) => {
    ctx.globalCompositeOperation = "destination-out"

    ctx.beginPath()

    ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 2 * Math.PI)
    ctx.fill()


}

const selectTool = ({target}) => {
    const selectTool = target.closest("button")
    const action = selectTool.getAttribute("data-action")

    if (action) {
        tools.forEach((tool) => tool.classList.remove("active"))
        activetool = action
        selectTool.classList.add("active")
    }

   
}

tools.forEach((tool) => {
    tool.addEventListener("click", selectTool)

})
