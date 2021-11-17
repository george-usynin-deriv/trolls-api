import React, { useState, useEffect } from "react";
import Image from "next/image";
const prism = require("prismjs")
require("prismjs/components/prism-markup-templating.js")
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-python");
require("prismjs/components/prism-csharp");
require("prismjs/components/prism-php");

import styles from "./CodeSample.module.scss";

type Props = {
    id?: string,
    title?: string,
    desc?: string,
    subdesc?: string
}


const CodeSample = ({ id, title, desc, subdesc }: Props) => {

    const [jsContent, setjsContent] = useState(" ");
    const [lang, setLang] = useState("javascript");





    useEffect(() => {
        const fileExtension: any = { javascript: "js", csharp: "cs", php: "php", python: "py" }
        const fileExt = fileExtension[`${lang}`];
        const filePath = `/demoCode/${id}-${lang}.${fileExt}`;

        fetch(filePath).then((response) => response.text()).then(data => {
            const formattedCode = data.replaceAll("&lt;", "<").replaceAll("&gt;", ">")
            setjsContent(formattedCode)
            prism.highlightAll()
        }
        )
    }, [id, lang])

    return (
        <div className={styles.codeBlock}>
            <h2 className={styles.codeBlockTitle}>{title}</h2>
            <p className={styles.codeBlockDesc}>{desc}</p>
            {subdesc && <p className={styles.codeBlockDesc}>{subdesc}</p>}
            <div className={styles.card}>
                <div className={styles.card_header}>
                    <p className={styles.card_header_title}>
                        <select id="demo-buy-contract" value={lang} onChange={(event) => setLang(event.target.value)} >
                            <option value="javascript">JavaScript</option>
                            <option value="csharp">C#</option>
                            <option value="php">PHP</option>
                            <option value="python">Python</option>
                        </select>
                    </p>
                    <div className={styles.copy_button}>

                        <Image className={styles.copy_button_image} src="/copy.svg" width="16" height="16" alt="copy code icon" />

                        <span className={styles.copy_button_text}> Copy </span>



                    </div>
                </div>
                <div>
                    <pre className={styles.pre}><code className={`language-${lang}`}>{jsContent}</code></pre>
                </div>

            </div>
        </div>
    )
}


export default CodeSample;