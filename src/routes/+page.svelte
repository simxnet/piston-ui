<script lang="ts">
    import { Alert, Button, Heading, Input, Label, P, Select, Textarea } from 'flowbite-svelte';
    import type { PistonExecuteData, PistonExecuteResult, PistonRuntime } from '../lib/types';
    import { onMount } from 'svelte';
  
    let languages: PistonRuntime[] = [];
    let options = {
      args: "",
      language: "",
      code: ""
    };
    let codeOutput: PistonExecuteResult | undefined;
  
    async function executeCode(options: PistonExecuteData): Promise<PistonExecuteResult> {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(options)
      });
  
      const data = await response.json() as unknown as PistonExecuteResult;
      codeOutput = data;
  
      return data;
    }
  
    async function execute() {
      await executeCode({
        language: options.language,
        version: '*',
        args: options.args.split(' '),
        files: [
          {
            content: options.code
          }
        ]
      });
    }
  
    onMount(async () => {
      const response = await fetch("https://emkc.org/api/v2/piston/runtimes");
  
      languages = await response.json() as unknown as PistonRuntime[];
    });
  </script>
  
<div class="flex flex-col gap-2">
    <Heading>Piston UI</Heading>
    <P>A web interface to interact with Piston api</P>
    <Alert dismissable class="my-5">
        <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        </span>
        <span class="sr-only">Read before using</span>
        <span class="font-medium">Follow these rules:</span>
        <ul slot="extra" class="mt-0 ml-8 list-disc list-inside">
          <li>Do not abuse of the emkc api</li>
          <li>Do not execute malicious code</li>
          <li>Leave a star on our repo :)</li>
        </ul>
      </Alert>
    <div class="w-full bg-zinc-900 p-5 rounded-xl flex flex-col gap-3">
        <div class="flex flex-col gap-1">
            <Label>Language</Label>
            {#if languages}
            <Select bind:value={options.language} class="!bg-zinc-800 !border-zinc-700">
                {#each languages as runtime}
                    <option value={runtime.language}>{runtime.language}</option>
                {/each}
            </Select>
            {:else}
                 <P>loading...</P>
            {/if}
        </div>
        <div class="flex flex-col gap-1">
            <Label>Args</Label>
            <Input bind:value={options.args} placeholder="Optional arguments" class="!bg-zinc-800 !border-zinc-700" />
        </div>
        <div class="flex flex-col gap-1">
            <Label>Code</Label>
            <Textarea bind:value={options.code} class="!bg-zinc-800 !border-zinc-700 code" />
        </div>
        <Button on:click={async () => await execute()}>Execute</Button>
    </div>
    <div class="my-5 w-full bg-zinc-900 p-5 rounded-xl text-white">
        {#if codeOutput}
             <div class="code">
                {codeOutput.run.output}
             </div>
        {:else}
          <Alert>
            <span class="font-semibold">Hey,</span> your code results will display here
          </Alert>
        {/if}
    </div>
</div>