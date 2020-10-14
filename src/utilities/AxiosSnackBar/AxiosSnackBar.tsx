
export function errorSnackBar(reason: any, props: any) {
    if(reason.message.includes("401")) {
        window.location.reload();
    } else {
        let message: string = reason.message;
        if(reason.message.includes("500")) {
            message = "Remote server is down"
        }
        props.enqueueSnackbar(message, {
            anchorOrigin: {horizontal: "right", vertical: "top"},
            variant: "error",
            transitionDuration: {enter: 225, exit: 195},
            autoHideDuration: 2500
        });
    }
}