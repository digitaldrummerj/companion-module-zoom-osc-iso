import { CompanionActionDefinition } from '@companion-module/base'
import { ZoomConfig } from '../config'
import { InstanceBaseExt, ZoomGroupDataInterface, arrayAdd, arrayRemove, options, userExist } from '../utils'
import {
	sendActionCommand,
	createCommand,
	select,
	PreviousSelectedCallersSave,
	toggleSelectedUser,
	selectionMethod,
} from './action-utils'
import { FeedbackId } from '../feedback'

export enum ActionIdUserRolesAndAction {
	makeHost = 'makeHost',
	makeCoHost = 'makeCoHost',
	revokeCoHost = 'revokeCoHost',
	reclaimHost = 'reclaimHost',
	makePanelist = 'makePanelist',
	makeAttendee = 'makeAttendee',
	ejectParticipant = 'ejectParticipant',
	rename = 'rename',
	allowToRecord = 'allowToRecord',
	disallowToRecord = 'disallowToRecord',
	selectUser = 'select_User',
}

export function GetActionsUserRolesAndAction(instance: InstanceBaseExt<ZoomConfig>): {
	[id in ActionIdUserRolesAndAction]: CompanionActionDefinition | undefined
} {
	let CHOICES_USERS_DEFAULT = '0'
	const CHOICES_USERS: {
		id: string
		label: string
	}[] = [{ id: '0', label: 'no users' }]

	if (instance.ZoomUserData) {
		CHOICES_USERS.length = 0
		for (const key in instance.ZoomUserData) {
			if (userExist(Number(key), instance.ZoomUserData)) {
				const user = instance.ZoomUserData[key]
				CHOICES_USERS.push({ id: user.zoomId.toString(), label: user.userName })
				CHOICES_USERS_DEFAULT = user.zoomId.toString()
			}
		}
	}

	const userOption: any = {
		type: 'dropdown',
		label: 'User',
		id: 'user',
		default: CHOICES_USERS_DEFAULT,
		choices: CHOICES_USERS,
	}

	const actions: { [id in ActionIdUserRolesAndAction]: CompanionActionDefinition | undefined } = {
		[ActionIdUserRolesAndAction.selectUser]: {
			name: 'Preselect user',
			options: [
				userOption,
				{
					type: 'dropdown',
					label: 'Option',
					id: 'option',
					default: '',
					choices: [
						{ label: 'Toggle', id: 'toggle' },
						{ label: 'Select', id: 'select' },
						{ label: 'Remove', id: 'remove' },
					],
				},
			],
			callback: (action) => {
				PreviousSelectedCallersSave(instance)
				switch (action.options.option) {
					case 'toggle':
						instance.ZoomClientDataObj.PreviousSelectedCallers = instance.ZoomClientDataObj.selectedCallers
						toggleSelectedUser(instance, action.options.user as number)
						break
					case 'select':
						if (instance.config.selectionMethod === selectionMethod.SingleSelection) {
							instance.ZoomClientDataObj.selectedCallers.length = 0
						}
						instance.ZoomClientDataObj.selectedCallers = arrayAdd(
							instance.ZoomClientDataObj.selectedCallers,
							action.options.user as number
						)
						break
					case 'remove':
						instance.ZoomClientDataObj.selectedCallers = arrayRemove(
							instance.ZoomClientDataObj.selectedCallers,
							action.options.user as number
						)
						break
				}
				instance.UpdateVariablesValues()
				instance.checkFeedbacks(
					FeedbackId.userNameBased,
					FeedbackId.userNameBasedAdvanced,
					FeedbackId.indexBased,
					FeedbackId.indexBasedAdvanced,
					FeedbackId.galleryBased,
					FeedbackId.galleryBasedAdvanced,
					FeedbackId.groupBased,
					FeedbackId.groupBasedAdvanced
				)
			},
		},
		// Rename Actions
		[ActionIdUserRolesAndAction.rename]: {
			name: 'Rename',
			options: [userOption, options.name],
			callback: async (action) => {
				const newName = await instance.parseVariablesInString(action.options.name as string)
				const ZoomID = action.options.user as number
				const oscPath = `/zoom/zoomID/rename`
				const sendToCommand: any = {
					id: 'rename',
					options: {
						command: oscPath,
						args: [
							{ type: 'i', value: ZoomID },
							{ type: 's', value: newName },
						],
					},
				}
				sendActionCommand(instance, sendToCommand)
				// Also update locally
				if (userExist(ZoomID, instance.ZoomUserData)) {
					instance.ZoomUserData[ZoomID].userName = newName
				}

				// Update position and group
				const index = instance.ZoomVariableLink.findIndex((finduser: { zoomId: number }) => finduser.zoomId === ZoomID)
				if (index !== -1) instance.ZoomVariableLink[index].userName = newName
				instance.ZoomGroupData.forEach((group: ZoomGroupDataInterface) => {
					group.users.forEach((user) => {
						if (user.zoomID === ZoomID) {
							user.userName = newName
							return
						}
					})
				})
				instance.UpdateVariablesValues()
			},
		},
		[ActionIdUserRolesAndAction.makeHost]: {
			name: 'Make Host',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/makeHost', userName, select.multi)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserRolesAndAction.makeHost,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserRolesAndAction.makeCoHost]: {
			name: 'Make CoHost',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/makeCoHost', userName, select.multi)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserRolesAndAction.makeCoHost,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserRolesAndAction.revokeCoHost]: {
			name: 'Revoke CoHost',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/revokeCoHost', userName, select.multi)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserRolesAndAction.revokeCoHost,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserRolesAndAction.reclaimHost]: {
			name: 'Reclaim Host',
			options: [],
			callback: () => {
				// type: 'Global'
				const command = createCommand(instance, '/reclaimHost')
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserRolesAndAction.reclaimHost,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserRolesAndAction.makePanelist]: {
			name: 'Make Panelist',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/makePanelist', userName, select.multi)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserRolesAndAction.makePanelist,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserRolesAndAction.makeAttendee]: {
			name: 'Make Attendee',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/makeAttendee', userName, select.multi)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserRolesAndAction.makeAttendee,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserRolesAndAction.ejectParticipant]: {
			name: 'Eject Participant',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/eject', userName, select.multi)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserRolesAndAction.ejectParticipant,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserRolesAndAction.allowToRecord]: {
			name: 'Allow To Record',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/allowToRecord', userName, select.multi)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserRolesAndAction.allowToRecord,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserRolesAndAction.disallowToRecord]: {
			name: 'Disallow To Record',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/disallowToRecord', userName, select.multi)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserRolesAndAction.disallowToRecord,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
	}

	return actions
}
