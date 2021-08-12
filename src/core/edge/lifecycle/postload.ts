import edge from 'edge-js';
import type { Context } from '../../items/context';

edge.func<[Context], void>({
	assemblyFile: 'SS',
	typeName: 'SS.Bridge',
	methodName: 'InvokeLoad',
})([{
	currentWorkingDirectory: process.cwd(),
}], true);
