import Vue from 'vue'
import {
    bkButton, bkCard, bkUpload, bkAlert, bkCheckbox, bkCheckboxGroup, bkCollapse, bkCollapseItem, bkContainer, bkCol, bkRow, bkDatePicker,
    bkDialog, bkDropdownMenu, bkException, bkForm, bkFormItem, bkInput, bkInfoBox, bkLoading, bkMessage,
    bkNavigation, bkNavigationMenu, bkNavigationMenuItem, bkNotify, bkOption, bkOptionGroup, bkPagination,
    bkPopover, bkProcess, bkProgress, bkRadio, bkRadioGroup, bkSearchSelect, bkSelect, bkTableSettingContent, bkBigTree,
    bkSideslider, bkSlider, bkSteps, bkSwitcher, bkTab, bkTabPanel, bkTable, bkTableColumn, bkTagInput, bkTimePicker,
    bkTimeline, bkClickoutside, bkTooltips, bkOverflowTips, bkCascade, bkIcon, bkDivider, bkPopconfirm, bkRadioButton, bkTag, bkResizeLayout
} from 'bk-magic-vue'

// bkDiff 组件体积较大且不是很常用，因此注释掉。如果需要，打开注释即可
// import { bkDiff } from '@tencent/bk-magic-vue'

// components use
// Vue.use(bkBadge)
Vue.use(bkButton)
Vue.use(bkCard)
Vue.use(bkUpload)
Vue.use(bkAlert)
Vue.use(bkCheckbox)
Vue.use(bkCheckboxGroup)
Vue.use(bkDivider)
Vue.use(bkPopconfirm)
Vue.use(bkRadioButton)
Vue.use(bkTag)
Vue.use(bkTableSettingContent)
Vue.use(bkCol)
Vue.use(bkCollapse)
Vue.use(bkCollapseItem)
Vue.use(bkContainer)
Vue.use(bkDatePicker)
Vue.use(bkDialog)
Vue.use(bkDropdownMenu)
Vue.use(bkException)
Vue.use(bkForm)
Vue.use(bkFormItem)
Vue.use(bkInput)
Vue.use(bkResizeLayout)
// Vue.use(bkMemberSelector)
Vue.use(bkNavigation)
Vue.use(bkNavigationMenu)
Vue.use(bkNavigationMenuItem)
Vue.use(bkOption)
Vue.use(bkOptionGroup)
Vue.use(bkPagination)
Vue.use(bkPopover)
Vue.use(bkProcess)
Vue.use(bkProgress)
Vue.use(bkRadio)
Vue.use(bkRadioGroup)
// Vue.use(bkRoundProgress)
Vue.use(bkRow)
Vue.use(bkSearchSelect)
Vue.use(bkSelect)
Vue.use(bkSideslider)
Vue.use(bkSlider)
Vue.use(bkSteps)
Vue.use(bkSwitcher)
Vue.use(bkTab)
Vue.use(bkTabPanel)
Vue.use(bkTable)
Vue.use(bkTableColumn)
Vue.use(bkTagInput)
Vue.use(bkTimePicker)
Vue.use(bkTimeline)
// Vue.use(bkTransfer)
// Vue.use(bkTree)
// Vue.use(bkUpload)
Vue.use(bkBigTree)
Vue.use(bkCascade)
// Vue.use(bkVirtualScroll)
Vue.use(bkIcon)

// directives use
Vue.use(bkClickoutside)
Vue.use(bkTooltips)
Vue.use(bkLoading)
Vue.use(bkOverflowTips)

export const $error = (message, delay = 3000) => {
    bkMessage({
        message,
        delay,
        theme: 'error'
    })
}

export const $success = (message, delay = 3000) => {
    bkMessage({
        message,
        delay,
        theme: 'success'
    })
}

export const $info = (message, delay = 3000) => {
    bkMessage({
        message,
        delay,
        theme: 'primary'
    })
}

export const $warn = (message, delay = 3000) => {
    bkMessage({
        message,
        delay,
        theme: 'warning',
        hasCloseIcon: true
    })
}

// Vue prototype mount
Vue.prototype.$error = $error
Vue.prototype.$success = $success
Vue.prototype.$info = $info
Vue.prototype.$warn = $warn
Vue.prototype.$bkInfo = bkInfoBox
Vue.prototype.$bkMessage = bkMessage
Vue.prototype.$bkNotify = bkNotify
Vue.prototype.$bkLoading = bkLoading
