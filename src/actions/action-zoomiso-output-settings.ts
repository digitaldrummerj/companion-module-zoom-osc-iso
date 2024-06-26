import { CompanionActionDefinition } from '@companion-module/base'
import { ZoomConfig } from '../config.js'
import { InstanceBaseExt, options } from '../utils.js'
import { createCommand, sendActionCommand } from './action-utils.js'

export enum ActionIdZoomISOOutputSettings {
	setOutputCount = 'set_Output_Count',
	enableOutput = 'enable_Output',
	setVideoLossMode = 'set_VideoLoss_Mode',
	deleteOutput = 'delete_Output',
	setAudioMode = 'set_Audio_Mode',
	addOutput = 'add_Output',
	disableOutput = 'disable_Output',
	setAudioGainReduction = 'set_AudioGain_Reduction',
	setOutputSelection = 'set_Output_Selection',
	setAudioSelection = 'set_Audio_Selection',
	setOutputEmbeddedAudio = 'set_Output_Embedded_Audio',
	setOutputName = 'set_Output_Name',
	setOutputMode = 'set_Output_Mode',
	setOutputType = 'set_Output_Type',
}

export function GetActionsZoomISOOutputSettings(instance: InstanceBaseExt<ZoomConfig>): {
	[id in ActionIdZoomISOOutputSettings]: CompanionActionDefinition | undefined
} {
	const actions: { [id in ActionIdZoomISOOutputSettings]: CompanionActionDefinition | undefined } = {
		[ActionIdZoomISOOutputSettings.setVideoLossMode]: {
			name: 'set Video Loss Mode',
			options: [options.videoLossMode],
			callback: (action): void => {
				// type: 'ISO'
				const command = createCommand(instance, '/setVideoLossMode')
				command.args.push({ type: 's', value: action.options.videoLossMode })

				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.setVideoLossMode,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},
		[ActionIdZoomISOOutputSettings.deleteOutput]: {
			name: 'delete Output',
			options: [options.output],
			callback: (action): void => {
				// type: 'ISO'
				const command = createCommand(instance, '/deleteOutput')
				command.args.push({ type: 'i', value: action.options.output })

				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.deleteOutput,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},
		[ActionIdZoomISOOutputSettings.setOutputCount]: {
			name: 'set Output Count',
			options: [options.count],
			callback: (action): void => {
				// type: 'ISO'
				const command = createCommand(instance, '/setOutputCount')
				command.args.push({ type: 'i', value: action.options.count })
				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.setOutputCount,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},
		[ActionIdZoomISOOutputSettings.enableOutput]: {
			name: 'enableOutput',
			options: [options.output],
			callback: (action): void => {
				// type: 'ISO'
				const command = createCommand(instance, '/enableOutput')
				command.args.push({ type: 'i', value: action.options.output })
				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.setOutputCount,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},
		[ActionIdZoomISOOutputSettings.setAudioMode]: {
			name: 'setAudioMode',
			options: [options.channel],
			callback: (action): void => {
				// type: 'ISO'
				const command = createCommand(instance, '/setAudioMode')
				command.args.push({ type: 'i', value: action.options.output })
				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.setAudioMode,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},
		[ActionIdZoomISOOutputSettings.addOutput]: {
			name: 'addOutput',
			options: [],
			callback: (): void => {
				// type: 'ISO'
				const command = createCommand(instance, '/addOutput')

				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.addOutput,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},

		[ActionIdZoomISOOutputSettings.disableOutput]: {
			name: 'disableOutput',
			options: [options.output],
			callback: (action): void => {
				// type: 'ISO'
				const command = createCommand(instance, '/disableOutput')
				command.args.push({ type: 'i', value: action.options.output })
				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.disableOutput,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},
		[ActionIdZoomISOOutputSettings.setAudioGainReduction]: {
			name: 'set Audio Gain Reduction',
			options: [options.channel, options.reductionAmount],
			callback: (action): void => {
				// type: 'ISO'
				const command = createCommand(instance, '/setAudioGainReduction')
				command.args.push({ type: 'i', value: action.options.channel })
				command.args.push({ type: 'i', value: action.options.reductionAmount })

				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.setAudioGainReduction,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},
		[ActionIdZoomISOOutputSettings.setOutputSelection]: {
			name: 'set Output Selection',
			options: [options.output, options.reductionAmount],
			callback: (action): void => {
				// type: 'ISO'
				const command = createCommand(instance, '/setOutputSelection')
				command.args.push({ type: 'i', value: action.options.output })
				command.args.push({ type: 'i', value: action.options.reductionAmount })

				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.setOutputSelection,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},
		[ActionIdZoomISOOutputSettings.setAudioSelection]: {
			name: 'set Audio Selection',
			options: [options.output, options.reductionAmount],
			callback: (action): void => {
				// type: 'ISO'
				const command = createCommand(instance, '/setAudioSelection')
				command.args.push({ type: 'i', value: action.options.channel })
				command.args.push({ type: 'i', value: action.options.reductionAmount })

				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.setAudioSelection,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},
		[ActionIdZoomISOOutputSettings.setOutputEmbeddedAudio]: {
			name: 'set Output Embedded Audio',
			options: [options.output, options.mode],
			callback: (action): void => {
				// type: 'ISO'
				const command = createCommand(instance, '/setOutputEmbeddedAudio')
				command.args.push({ type: 'i', value: action.options.output })
				command.args.push({ type: 'i', value: action.options.mode })

				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.setOutputEmbeddedAudio,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},
		[ActionIdZoomISOOutputSettings.setOutputName]: {
			name: 'set Output Name',
			options: [options.output, options.name],
			callback: async (action): Promise<void> => {
				// type: 'ISO'
				const command = createCommand(instance, '/setOutputName')
				const newName = await instance.parseVariablesInString(action.options.name as string)
				command.args.push({ type: 'i', value: action.options.output })
				command.args.push({ type: 's', value: newName })

				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.setOutputName,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},

		[ActionIdZoomISOOutputSettings.setOutputMode]: {
			name: 'setOutputMode',
			options: [options.output],
			callback: (action): void => {
				// type: 'ISO'
				const command = createCommand(instance, '/setOutputMode')
				command.args.push({ type: 'i', value: action.options.output })
				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.setOutputMode,
					options: {
						command: command.oscPath,
						args: command.args,
					},
				}
				sendActionCommand(instance, sendToCommand)
			},
		},
		[ActionIdZoomISOOutputSettings.setOutputType]: {
			name: 'setOutputType',
			options: [options.output],
			callback: (action): void => {
				// type: 'ISO'
				const command = createCommand(instance, '/setOutputType')
				command.args.push({ type: 'i', value: action.options.output })
				const sendToCommand = {
					id: ActionIdZoomISOOutputSettings.setOutputType,
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
