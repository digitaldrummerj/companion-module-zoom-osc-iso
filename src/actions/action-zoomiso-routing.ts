import { CompanionActionDefinition } from '@companion-module/base'
import { ZoomConfig } from '../config.js'
import { InstanceBaseExt, options } from '../utils.js'
import { createCommand, select, sendActionCommand } from './action-utils.js'

export enum ActionIdZoomISORouting {
	outputISO = 'output_ISO',
	audioISO = 'audio_ISO',
}

export function GetActionsZoomISORouting(instance: InstanceBaseExt<ZoomConfig>): {
	[id in ActionIdZoomISORouting]: CompanionActionDefinition | undefined
} {
	const actions: { [id in ActionIdZoomISORouting]: CompanionActionDefinition | undefined } = {
		[ActionIdZoomISORouting.outputISO]: {
			name: 'output ISO',
			options: [options.userName, options.output],
			callback: async (action): Promise<void> => {
				// type: 'ISO'
				const variableValue = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/outputISO', variableValue, select.multi)
				if (command.isValidCommand) {
					command.args.push({ type: 'i', value: action.options.output })

					const sendToCommand = {
						id: ActionIdZoomISORouting.outputISO,
						options: {
							command: command.oscPath,
							args: command.args,
						},
					}
					sendActionCommand(instance, sendToCommand)
				}
			},
		},
		[ActionIdZoomISORouting.audioISO]: {
			name: 'audio ISO',
			options: [options.userName, options.output],
			callback: async (action): Promise<void> => {
				// type: 'ISO'
				const variableValue = await instance.parseVariablesInString(action.options.userName as string)
				const command = createCommand(instance, '/audioISO', variableValue, select.single)
				if (command.isValidCommand) {
					command.args.push({ type: 'i', value: action.options.output })

					const sendToCommand = {
						id: ActionIdZoomISORouting.audioISO,
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
