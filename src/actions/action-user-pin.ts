import { CompanionActionDefinition } from '@companion-module/base'
import { ZoomConfig } from '../config.js'
import { InstanceBaseExt, options } from '../utils.js'
import { createCommand, select, sendActionCommand } from './action-utils.js'

export enum ActionIdUserPin {
	pin = 'pin',
	addPin = 'add_Pin',
	unpin = 'unpin',
	pinScreen2 = 'pin_Screen2',
	unPinScreen2 = 'unPinScreen2',
	clearPinsScreen2 = 'clearPinsScreen2',
	togglePin = 'toggle_Pin',
	togglePinScreen2 = 'togglePinScreen2',
	clearPins = 'clear_Pins',
}

export function GetActionsUserPin(instance: InstanceBaseExt<ZoomConfig>): {
	[id in ActionIdUserPin]: CompanionActionDefinition | undefined
} {
	const actions: { [id in ActionIdUserPin]: CompanionActionDefinition | undefined } = {
		[ActionIdUserPin.pin]: {
			name: 'Pin',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/pin', userName, select.single)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserPin.pin,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserPin.addPin]: {
			name: 'Add Pin (PRO)',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/addPin', userName, select.multi)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserPin.addPin,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserPin.unpin]: {
			name: 'Unpin',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/unPin', userName, select.multi)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserPin.unpin,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserPin.pinScreen2]: {
			name: 'Pin Screen2',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/pin2', userName, select.single)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserPin.pinScreen2,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserPin.unPinScreen2]: {
			name: 'Unpin Screen2',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/unPin2', userName, select.single)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserPin.unPinScreen2,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserPin.clearPinsScreen2]: {
			name: 'Clear PinsScreen2',
			options: [],
			callback: (): void => {
				// type: 'Global'
				const command = createCommand(instance, '/me/clearPin2')
				const sendToCommand = {
					id: ActionIdUserPin.clearPinsScreen2,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},
		[ActionIdUserPin.togglePin]: {
			name: 'Toggle Pin (PRO)',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/togglePin', userName, select.multi)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserPin.togglePin,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserPin.togglePinScreen2]: {
			name: 'Toggle PinScreen2 (PRO)',
			options: [options.userName],
			callback: async (action): Promise<void> => {
				// type: 'User'
				const userName = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/togglePin2', userName, select.single)
				if (command.isValidCommand) {
					const sendToCommand = {
						id: ActionIdUserPin.togglePinScreen2,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdUserPin.clearPins]: {
			name: 'Clear Pins (PRO)',
			options: [],
			callback: (): void => {
				// type: 'Global'
				const command = createCommand(instance, '/me/clearPin')
				const sendToCommand = {
					id: ActionIdUserPin.clearPins,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},
	}

	return actions
}
