

export default function convertFileListToBase64(files : FileList) : Promise<Array<{name: string, content: string}>>
{
    return new Promise((resolve, reject)=>{

        const result : Array<{name:string, content:string}> = [];
        for(var i = 0; i < files.length; i++)
        {
            var reader = new FileReader();
            reader.onload = (resultEvent) =>{
                result.push({ name : files[i].name, content: resultEvent.target?.result as string });

                if(result.length == files.length) {
                    resolve(result);
                }
            };

            reader.readAsDataURL(files[i]);
        }

        if(files.length == 0)
            resolve([]);
    });
}