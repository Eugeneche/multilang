import React, { useState, useEffect, useCallback } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as style from "./_GalleryItem.module.scss"
import leftArrow from "../../images/arrow-left-solid.svg"
import rightArrow from "../../images/arrow-right-solid.svg"


const GalleryItem = (props) => {

    const [currentImage, setCurrentImage] = useState(props.image)
    const [index, setIndex] = useState(props.index)

    const closeFullImage = () => {
        return props.toggleIsFullImage(false)      
    }

    const movePhotoRight = useCallback((event) => {

        if (event?.code === "ArrowLeft") {
            setIndex(index - 1) 
        }

    }, [index])

    const movePhotoLeft = useCallback((event) => {

        if (event?.code === "ArrowRight") {
            setIndex(index + 1) 
        }

    }, [index])

    const closeByEscape = (event) => {
        
        if (event?.code === 'Escape') {
            props.toggleIsFullImage(false)
        }       
    }

    useEffect(() => {

        setCurrentImage(props.images[index])

        if (index >= 0 && index <= props.images.length - 1) {
            setCurrentImage(props.images[index])
        } else {
            props.toggleIsFullImage(false)
        }
    }, [index])

    useEffect(() => {

        window.addEventListener('scroll', closeFullImage)

        return () => {
            window.removeEventListener('scroll', closeFullImage)
        }
        
    }, [])

    useEffect(() => {

        window.addEventListener('keyup', movePhotoLeft)

        return () => {
            window.removeEventListener('keyup', movePhotoLeft)
        }
        
    }, [movePhotoLeft])

    useEffect(() => {

        window.addEventListener('keyup', movePhotoRight)

        return () => {
            window.removeEventListener('keyup', movePhotoRight)
        }
        
    }, [movePhotoRight])

    useEffect(() => {

        window.addEventListener('keydown', closeByEscape)

        return () => {
            window.removeEventListener('keydown', closeByEscape)
        }
        
    }, [])
    
    return (
        <div className={style.photoItem} 
            style={index >= 0 && index <= props.images.length - 1 ? {display: "flex", transition: "all 1s ease", background: "#ffffff", zIndex: 1000} : {display: "none", transition: "all 1s ease", background: "#ffffff00", zIndex: 0}}

            onClick={(e) => {
                console.log(e)
                    e.target.localName === "div" && props.toggleIsFullImage(false)
                    }
                }
            >
            <button className={style.arrowLeft}
                 onClick={(e) => {
                    e.stopPropagation()
                    setIndex(index - 1)}}>
                <img src={leftArrow} alt="left arrow icon"></img>
            </button>
            <div className={style.giContainer} onClick={(e) => {
                e.stopPropagation()
                setIndex(index + 1)
                }}>
                <GatsbyImage
                    className={style.photoItemFull}
                    alt="ff"
                    image={getImage(currentImage)}
                    style={{overflow: "visible", height: "96vh", width: "fit-content"}}
                />
            </div>
            <button className={style.arrowRight}
                 onClick={(e) => {
                    e.stopPropagation()
                    setIndex(index + 1)}}>
                <img src={rightArrow} alt="right arrow icon"></img>
            </button>
        </div>
    )
}

export default React.memo(GalleryItem)