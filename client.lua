RegisterNuiCallback('runCode:lua', function(data, cb)
    local func, loadError = load(data)

    if loadError ~= nil then
        cb({ success = false, output = loadError })
    end

    local result = { pcall(func --[[@as function]]) }
    local success = table.remove(result, 1)
    local output = ''

    if #result == 1 then
        output = json.encode(result[1])
    elseif #result > 1 then
        output = json.encode(result)
    end

    cb({ success = success, output = output })
end)
