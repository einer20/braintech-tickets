import { initializeApp } from "firebase/app";
import { CSSProperties, forwardRef, useEffect, useRef, useState } from "react";
import { firebaseConfig } from "../../firebaseConfig";
import { getBlob, getDownloadURL, getStorage, ref, updateMetadata } from "firebase/storage";
import { Button } from "@chakra-ui/react";
import Image from "next/image";

export type FirebaseImgProps = { title?: string, width?: number | string, height?: number | string, disabledCache? : boolean, url : string, onFailed?: () => void, style? : CSSProperties };
const FirebaseImg = forwardRef<HTMLImageElement, FirebaseImgProps>(( props, fref) => 
{
    const [ imageState, setImageState ] = useState<"loading"  | "loaded" | "failed">("loading");
    const imgRef =  useRef<HTMLImageElement>(null);

    useEffect(()=>{
        initializeApp(firebaseConfig);
        loadImage();
    },[]);

    const loadImage = async ()=>{
        setImageState("loading");

        const storedImage = localStorage.getItem(`img-${props.url}`);
        if( props.disabledCache || storedImage == null)
        {
           try {

                const r = ref(getStorage(), props.url);
                var b = await getBlob(r);
        
                var reader = new FileReader();
        
                reader.onload = (r)=>{
                    setImageState("loaded");
                    imgRef.current!.src = r.target?.result as string;
                    localStorage.setItem(`img-${props.url}`, r.target?.result as string);
                }
        
                reader.readAsDataURL(b);

           } catch(e) {
                setImageState("failed");
                if(props.onFailed)
                    props.onFailed();
           }
        }
        else {
            setImageState("loaded")
            imgRef.current!.src = storedImage;
        };
    }

    const FailedErorr = ()=> <div> <span style={{color:'red'}}>Imagen no pude cargar</span>. <Button onClick={x=> loadImage()} role="link">Reintentar</Button></div>;

    const _style = {...props.style, ...{display: imageState == "loaded" ? "block" : "none"}};
    return <>
        {imageState == "loading" ? <span>Cargando..</span> : null}
        {imageState == "failed" ? <FailedErorr /> : null}
        <img title={props.title} ref={imgRef} style={ _style } width={props.width} height={props.height} />
    </>
});

export default FirebaseImg;