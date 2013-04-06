# <%= version%> (<%= today%>)

<% if (_(changelog.feat).size() > 0) { %>## Features
<% _(changelog.feat).forEach(function(changes, scope) { %>### <%= scope%>
<% changes.forEach(function(change) { %>
* <%= change.msg%> (<%= change.sha1%>)
<% }) %>
<% }) %><% } %>

<% if (_(changelog.fix).size() > 0) { %>## Bug fixes
<% _(changelog.fix).forEach(function(changes, scope) { %>### <%= scope%>
<% changes.forEach(function(change) { %>
* <%= change.msg%> (<%= change.sha1%>)
<% }) %>
<% }) %><% } %>
