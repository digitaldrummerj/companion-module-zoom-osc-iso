import { CompanionPreset } from '../../../instance_skel_types'
import ZoomInstance from './index'
import { GlobalActionCallbacks, UserActionCallbacks } from './actions'
import { FeedbackCallbacks } from './feedback'
const { UserActions, GlobalActions, SpecialActions } = require('./osccommands')

export type PresetCategory = 'Select Users' | 'User presets' | 'Global Presets' | 'Special Presets'

interface ZoomUserPresetAdditions {
	category: string
	actions: UserActionCallbacks[]
	release_actions?: UserActionCallbacks[]
	feedbacks: FeedbackCallbacks[]
}

interface ZoomGlobalPresetAdditions {
	category: string
	actions: GlobalActionCallbacks[]
	release_actions?: GlobalActionCallbacks[]
	feedbacks: FeedbackCallbacks[]
}

export type ZoomUserPreset = Exclude<CompanionPreset, 'category' | 'actions' | 'release_actions' | 'feedbacks'> &
	ZoomUserPresetAdditions
export type ZoomGlobalPreset = Exclude<CompanionPreset, 'category' | 'actions' | 'release_actions' | 'feedbacks'> &
	ZoomGlobalPresetAdditions

export function getSelectUsersPresets(instance: ZoomInstance): CompanionPreset[] {
	let presets: CompanionPreset[] = []

	instance.ZoomUserData.forEach((user) => {

		presets.push({
			category: 'Select Callers',
			label: user.userName,
			bank: {
				style: 'text',
				text: `Select\\n$(zoomosc:${user.zoomId})`,
				size: 'auto',
				color: instance.rgb(255, 255, 255),
				bgcolor: instance.rgb(125, 125, 125),
			},
			actions: [{ action: 'SelectUser', options: { user: user.zoomId } }],
			feedbacks: [
				{
					type: 'selectedUser',
					options: {
						user: user.zoomId,
						fg: instance.rgb(0, 0, 0),
						bg: instance.rgb(255, 255, 0),
					},
				},
				{
					type: 'microphoneLive',
					options: {
						user: user.zoomId,
						bg: instance.rgb(255, 0, 0),
					},
				},
			],
		})
		presets.push({
			category: 'Rename',
			label: user.userName,
			bank: {
				style: 'text',
				text: `Rename\\n$(zoomosc:${user.zoomId})`,
				size: 'auto',
				color: instance.rgb(255, 255, 255),
				bgcolor: instance.rgb(125, 125, 125),
			},
			actions: [{ action: 'renameGroup', options: { user: user.zoomId, name: user.userName } }],
			feedbacks: [],
		})
	})

	return presets
}
export function getUserPresets(instance: ZoomInstance): ZoomUserPreset[] {
	let presets: ZoomUserPreset[] = []

	for (const key in UserActions) {
		if (Object.prototype.hasOwnProperty.call(UserActions, key)) {
			const element = UserActions[key]
			presets.push({
				category: 'User Presets',
				label: element.shortDescription,
				bank: {
					style: 'text',
					text: element.description.substring(13),
					size: 'auto',
					color: instance.rgb(255, 255, 255),
					bgcolor: instance.rgb(0, 0, 0),
				},
				actions: [{ action: element.shortDescription, options: { user: '', args: '', command: element.command } }],
				feedbacks: [],
			})
		}
	}

	return presets
}
export function getSpecialPresets(instance: ZoomInstance): ZoomGlobalPreset[] {
	let presets: ZoomGlobalPreset[] = []

	for (const key in SpecialActions) {
		if (Object.prototype.hasOwnProperty.call(SpecialActions, key)) {
			const element = SpecialActions[key]
			presets.push({
				category: 'Special Presets',
				label: element.shortDescription,
				bank: {
					style: 'text',
					text: element.description.substring(15),
					size: 'auto',
					color: instance.rgb(255, 255, 255),
					bgcolor: instance.rgb(0, 0, 0),
				},
				actions: [{ action: element.shortDescription, options: { command: element.command } }],
				feedbacks: [],
			})
		}
	}

	return presets
}
export function getGlobalPresets(instance: ZoomInstance): ZoomGlobalPreset[] {
	let presets: ZoomGlobalPreset[] = []

	for (const key in GlobalActions) {
		if (Object.prototype.hasOwnProperty.call(GlobalActions, key)) {
			const element = GlobalActions[key]
			presets.push({
				category: 'Global Presets',
				label: element.shortDescription,
				bank: {
					style: 'text',
					text: element.description.substring(15),
					size: 'auto',
					color: instance.rgb(255, 255, 255),
					bgcolor: instance.rgb(0, 0, 0),
				},
				actions: [{ action: element.shortDescription, options: { command: element.command } }],
				feedbacks: [],
			})
		}
	}

	return presets
}