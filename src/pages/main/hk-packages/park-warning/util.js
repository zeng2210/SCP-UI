import { getCatchPic } from '../../api/park-warning'

export const recursionGetCatchPic = (flag, context, index) => {
  if (flag < 3) {
    let curItem = context.primaryWarnList[index]
    getCatchPic(curItem.eventHeader.eventId).then((rs) => {
      curItem.eventBody.scenePic[0] = rs
      context.$set(context.primaryWarnList, index, curItem)
      context.curIndex === index && context.setWarnData(index)
    }, () => {
      setTimeout(() => { recursionGetCatchPic(++flag, context, index) }, 1000)
    })
  }
}
