import { API } from "../../backend";

export const getData = (data1) => {
    fetch(`${API}/home`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
        },
        body: data1
    }).then(response => {
        //console.log(data.json())
        return JSON.parse(response);
    }).catch(err => console.log(err))
}
