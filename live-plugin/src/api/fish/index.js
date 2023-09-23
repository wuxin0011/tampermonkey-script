import { douyu_address_pattern, local_url } from "../../utils/index.js";
import { FishLive } from "../../plugins/index.js";

export const getInfo = async (roomId = local_url) => {
    if (douyu_address_pattern.test(roomId)) {
        roomId = FishLive.prototype.getRoomIdByUrl(roomId)
    }
    return await fetch(`https://www.douyu.com/betard/${roomId}`, {
        mode: 'cors',
        cache: 'default',
        method: 'GET'
    }).then(res => res.json())
}
