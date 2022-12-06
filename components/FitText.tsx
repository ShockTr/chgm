import {FunctionComponent, useEffect, useRef} from "react";

// @ts-ignore idk what the fuck is wrong and don't have much information about the module loaders, so I am using a workaround https://github.com/rikschennink/fitty/issues/76
import fittyMin from 'fitty/dist/fitty.min.js'
import fittyType from 'fitty'
const fitty = fittyMin as typeof fittyType

export const FitText : FunctionComponent<{children:string, minFontSize:string, maxFontSize:string, multiLine?:boolean}> = ({children, minFontSize, maxFontSize, multiLine}) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const fittyInstance = fitty(ref.current!, {
            multiLine : multiLine?? false,
            maxSize: parseInt(maxFontSize),
            minSize: parseInt(minFontSize)
        });
        setTimeout(() => {
            fittyInstance.fit()
        }, 0)
        return () => {
            fittyInstance.unsubscribe()
        }
    }, [maxFontSize, minFontSize, multiLine]);

    return (
        <div ref={ref}>
            {children}
        </div>
    )
}
