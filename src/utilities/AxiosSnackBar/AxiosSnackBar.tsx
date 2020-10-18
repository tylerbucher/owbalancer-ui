export interface ErrorObj {
    error: number;
    message: string;
}

export function errorSnackBar(reason: any, props: any, customError?: Array<ErrorObj>) {
    if(reason.message.includes("401")) {
        window.location.reload();
    } else {
        let message: string = reason.message;
        if(reason.message.includes("500")) {
            message = "Remote server is down"
        } else {
            if(customError !== undefined) {
                console.log(customError)
                for (let errorObj of customError) {
                    console.log(errorObj)
                    // @ts-ignore
                    if(reason.message.includes(errorObj.error.toString())) {
                        // @ts-ignore
                        message = errorObj.message;
                        break;
                    }
                }
            }
        }
        props.enqueueSnackbar(message, {
            anchorOrigin: {horizontal: "right", vertical: "top"},
            variant: "error",
            transitionDuration: {enter: 225, exit: 195},
            autoHideDuration: 2500
        });
    }
}