import { initializeApp } from "firebase/app";
import { forwardRef, useEffect, useState } from "react";
import { firebaseConfig } from "../../firebaseConfig";
import { getDownloadURL, getStorage, ref, updateMetadata } from "firebase/storage";
import { Button } from "@chakra-ui/react";

const  FirebaseImg = forwardRef<HTMLImageElement, { width?: number | string, height?: number | string, url : string, onFailed?: () => void }>(( props, fref) => 
{
    const [ imageState, setImageState ] = useState<"loading"  | "loaded" | "failed">();
    const [ imgUrl, setImgUrl] = useState<string>();

    useEffect(()=>{
        initializeApp(firebaseConfig);
        loadImage();
    },[]);

    const loadImage = ()=>{
        setImageState("loading");
        const r = ref(getStorage(), props.url);
        updateMetadata(r, {
            cacheControl: 'public,max-age=4000',
        }).then(x=>{
            
        })

        getDownloadURL(r).then(onLoadSuccess, onLoadFail);
       
    }

    const onLoadSuccess = (url : string)=>{
       
        setImgUrl(url);
        setImageState("loaded");
    }

    const onLoadFail = (e:any)=> {
        console.log(e);
        setImageState("failed");
    }

    const render = ()=>{
        if(imageState == "loading")
            return <span>Cargando..</span>;
        else if(imageState == "failed")
        {
            if(props.onFailed)
                props.onFailed();
           
            return <div>
                <span style={{color:'red'}}>Imagen no pude cargar</span>. <Button onClick={x=> loadImage()} role="link">Reintentar</Button>
            </div>
        }
        else {
            return <img src={imgUrl} ref={fref} width={props.width + "px"} height={props.height + "px"} />
        }
    }

    return render();
});

export default FirebaseImg;