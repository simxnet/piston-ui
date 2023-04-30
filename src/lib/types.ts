export interface PistonRuntime {
	language: string;
	version: string;
	aliases: string[];
	runtime?: string;
}

export interface PistonExecuteData {
	/**
	 * The language to use for execution, must be a string and must be installed.
	 */
	language: string;
	/**
	 * The version of the language to use for execution, must be a string containing a SemVer selector for the version or the specific version number to use.
	 */
	version: string;
	/**
	 *  An array of files containing code or other data that should be used for execution. The first file in this array is considered the main file.
	 */
	files: {
		/**
		 * The name of the file to upload, must be a string containing no path or left out.
		 */
		name?: string;
		/**
		 * The content of the files to upload, must be a string containing text to write.
		 */
		content: string;
		/**
		 * The encoding scheme used for the file content. One of base64, hex or utf8. Defaults to utf8.
		 */
		encoding?: "base64" | "hex" | "utf8";
	}[];
	/**
	 * The text to pass as stdin to the program. Must be a string or left out. Defaults to blank string.
	 */
	stdin?: string;
	/**
	 * The arguments to pass to the program. Must be an array or left out. Defaults to [].
	 */
	args?: string[];
	/**
	 * The maximum time allowed for the compile stage to finish before bailing out in milliseconds. Must be a number or left out. Defaults to 10000 (10 seconds).
	 */
	compile_timeout?: number;
	/**
	 * The maximum time allowed for the run stage to finish before bailing out in milliseconds. Must be a number or left out. Defaults to 3000 (3 seconds).
	 */
	run_timeout?: number;
	/**
	 * The maximum amount of memory the compile stage is allowed to use in bytes. Must be a number or left out. Defaults to -1 (no limit).
	 */
	compile_memory_limit?: number;
	/**
	 * The maximum amount of memory the run stage is allowed to use in bytes. Must be a number or left out. Defaults to -1 (no limit).
	 */
	run_memory_limit?: number;
}

export interface PistonExecuteResult {
	language: string;
	version: string;
	run: {
		stdout: string;
		stderr: string;
		output: string;
		code: number;
		signal: string | null;
	};
	/**
	 * Will only be present if the language requested requires a compile stage.
	 */
	compile?: {
		stdout: string;
		stderr: string;
		output: string;
		code: number;
		signal: string | null;
	};
}

export type PostRequestData = PistonExecuteData;
