const path = require('path');
const fs = require('fs');


//return merged path
exports.resolvedPath = function(directoryPath, fileName)
{
	return path.resolve(directoryPath, fileName);
}

exports.readFile = function(filePath)
{
	return new Promise(function(resolve, reject)
	{
		fs.readFile(filePath, 'utf8',
			function(err, data)
			{
				if (err)
				{
					reject(err);
				}
				else
				{
					resolve(data);
				}
			});
	});
}

exports.readDir = function(directoryPath)
{
	return new Promise(function(resolve, reject)
	{
		fs.readdir(directoryPath, 
		function(err, files)
		{
			if(err)
			{
				reject(err);
			}
			else
			{
				resolve(files);
			}		
		});
	});
}

exports.readDirFiles = function(directoryPath)
{
	return exports.readDir(directoryPath)
		.then(function(fileNames)
		{
			var my_arr = [];
			for(let i = 0; i < fileNames.length; i++)
			{
				my_arr.push(exports.readFile(
					exports.resolvedPath(directoryPath, fileNames[i])));
			}
			return Promise.all(my_arr); //returns a promise
		});

	/*return new Promise(function(resolve, reject)
	{
		fs.readdir(directoryPath, 
		function(err, files)
		{
			if(err)
			{
				reject(err);
			}
			else
			{
				var my_array = [];
				for(let i = 0; i < files.length; i++)
				{
					fs.readFile(files[i], 'utf8',
					function(err, data)
					{
						if (err)
						{
							reject(err);
						}
						else
						{
							my_array.push(data);
						}
					});
				}
				resolve(my_array);
			}		
		});
	});*/
}