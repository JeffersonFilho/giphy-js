import { PingbackEventType, pingback, PingbackActionType, bottleData } from '@giphy/js-analytics'
import { IGif, IUser } from '@giphy/js-types'
import { getClientRect } from '@giphy/js-util'

const firePingback = (actionType: PingbackActionType) => (
    gif: IGif,
    user: Partial<IUser>,
    type: PingbackEventType,
    e: Event,
) =>
    pingback({
        gif,
        user,
        responseId: gif.response_id,
        type,
        actionType,
        position: getClientRect(e.target as HTMLElement),
    })

export const onGifClick = firePingback('CLICK')

export const onGifSeen = (gif: IGif, user: Partial<IUser>, type: PingbackEventType, position: ClientRect) => {
    // third party here
    if (gif.bottle_data && gif.bottle_data.tags) {
        bottleData(gif.bottle_data.tags)
    }
    pingback({
        gif,
        user,
        responseId: gif.response_id,
        type,
        actionType: 'SEEN',
        position,
    })
}

export const onGifHover = firePingback('HOVER')
