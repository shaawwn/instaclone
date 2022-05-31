// uploadimage creates a modal witha  form for uploading images and creating captions
import style from '../styles/uploadimage.css'
import { useState, useEffect } from 'react'
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhotoFilm, faArrowLeft, faExpand, faMagnifyingGlassPlus, faLayerGroup} from '@fortawesome/free-solid-svg-icons'


function UploadImage(props) {

    const [imageSelected, setImageSelected] = useState(false)
    const [imageToUpload, setImageToUpload] = useState(null)

    // Functions
    const closeModal = props.appFunctions[0]
    function onImageSubmit(e) {
        // upload image to db
        const file = e.target.files[0];
        const storageRef = getStorage()
        const imageRef = ref(storageRef, `userimages/${file.name}`)
        const imageFile = new File([file], file.name)
        uploadBytes(imageRef, imageFile).then((snapshot) => {
            console.log("Image uploaded")
        })
    }

    function onImageSelect(e) {
        // begin process of craeting opst
        const image = e.target.files[0]
        setImageSelected(true)
        setImageToUpload(image)
    }

    function discardChanges() {
        // Create an alert asking use if they wish to discard, if yes, close upload modal,
        // if no, close alert
        if(window.confirm("Do you want to discard?")) {
            setImageSelected(false)
            closeModal()
        } 
    }

    function closeUploadModal() {
        // close upload modal
        console.log("Closing upload modal")
        closeModal()
    }
    // NOTE ON GETTING IMAGE
    // USE THE FILE REFERENCE PATH THAT IS CREATED AS A REFERENCE IE USERIMAGES/IMAGE.JPG
    useEffect(() => {

    }, [imageSelected])
    return(
        <div className="upload-image">
            <button className="upload-image-modal-close" onClick={closeUploadModal}>X</button>
            <div>
                {imageSelected
                ? <form className="upload-image-form edit">
                    <div className="upload-image-navbar">
                        <FontAwesomeIcon icon={faArrowLeft} size="xl" onClick={discardChanges}/>
                        <p>Crop</p>
                        <p style={{color:'blue'}}>Next</p>
                    </div>
                    <img src={URL.createObjectURL(imageToUpload)} alt="to upload" />
                    <div className="edit-image-footer">
                        <div className="edit-image-footer left">
                            <FontAwesomeIcon icon={faExpand} size={"2xl"}/>
                            <FontAwesomeIcon icon={faMagnifyingGlassPlus} size={"2xl"}/>
                        </div>
                        <div className="edit-image-footer right">
                            <FontAwesomeIcon icon={faLayerGroup} size={"2xl"}/>
                        </div>
                        
                    </div>
                </form>
                :<form className="upload-image-form">
                    <FontAwesomeIcon icon={faPhotoFilm} size={'6x'} color={'grey'}/>
                    <p className="upload-image-p">Drag photos or videos here</p>
                    <label htmlFor="image-upload" className="image-upload">
                        Select from Computer
                    </label>
                    <input id="image-upload" type="file" name="file" onChange={onImageSelect}/>
                </form>
                }
            </div>
        </div>
    )
}

export default UploadImage