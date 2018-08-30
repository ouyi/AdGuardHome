import axios from 'axios';
import startOfToday from 'date-fns/start_of_today';
import endOfToday from 'date-fns/end_of_today';
import dateFormat from 'date-fns/format';

export default class Api {
    baseUrl = 'control';

    async makeRequest(path, method = 'POST', config) {
        const response = await axios({
            url: `${this.baseUrl}/${path}`,
            method,
            ...config,
        });
        return response.data;
    }

    // Global methods
    GLOBAL_RESTART = { path: 'restart', method: 'POST' };
    GLOBAL_START = { path: 'start', method: 'POST' };
    GLOBAL_STATS = { path: 'stats', method: 'GET' };
    GLOBAL_STATS_HISTORY = { path: 'stats_history', method: 'GET' };
    GLOBAL_STATUS = { path: 'status', method: 'GET' };
    GLOBAL_STOP = { path: 'stop', method: 'POST' };
    GLOBAL_STATS_TOP = { path: 'stats_top', method: 'GET' };
    GLOBAL_QUERY_LOG = { path: 'querylog', method: 'GET' };
    GLOBAL_QUERY_LOG_ENABLE = { path: 'querylog_enable', method: 'POST' };
    GLOBAL_QUERY_LOG_DISABLE = { path: 'querylog_disable', method: 'POST' };
    GLOBAL_SET_UPSTREAM_DNS = { path: 'set_upstream_dns', method: 'POST' };

    restartGlobalFiltering() {
        const { path, method } = this.GLOBAL_RESTART;
        return this.makeRequest(path, method);
    }

    startGlobalFiltering() {
        const { path, method } = this.GLOBAL_START;
        return this.makeRequest(path, method);
    }

    stopGlobalFiltering() {
        const { path, method } = this.GLOBAL_STOP;
        return this.makeRequest(path, method);
    }

    getGlobalStats() {
        const { path, method } = this.GLOBAL_STATS;
        return this.makeRequest(path, method);
    }

    getGlobalStatsHistory() {
        const { path, method } = this.GLOBAL_STATS_HISTORY;
        const format = 'YYYY-MM-DDTHH:mm:ssZ';
        const todayStart = dateFormat(startOfToday(), format);
        const todayEnd = dateFormat(endOfToday(), format);

        const config = {
            params: {
                start_time: todayStart,
                end_time: todayEnd,
                time_unit: 'hours',
            },
        };
        return this.makeRequest(path, method, config);
    }

    getGlobalStatus() {
        const { path, method } = this.GLOBAL_STATUS;
        return this.makeRequest(path, method);
    }

    getGlobalStatsTop() {
        const { path, method } = this.GLOBAL_STATS_TOP;
        return this.makeRequest(path, method);
    }

    getQueryLog() {
        const { path, method } = this.GLOBAL_QUERY_LOG;
        return this.makeRequest(path, method);
    }

    downloadQueryLog() {
        const { path, method } = this.GLOBAL_QUERY_LOG;
        const queryString = '?download=1';
        return this.makeRequest(path + queryString, method);
    }

    enableQueryLog() {
        const { path, method } = this.GLOBAL_QUERY_LOG_ENABLE;
        return this.makeRequest(path, method);
    }

    disableQueryLog() {
        const { path, method } = this.GLOBAL_QUERY_LOG_DISABLE;
        return this.makeRequest(path, method);
    }

    setUpstream(url) {
        const { path, method } = this.GLOBAL_SET_UPSTREAM_DNS;
        const config = {
            data: url,
            header: { 'Content-Type': 'text/plain' },
        };
        return this.makeRequest(path, method, config);
    }

    // Filtering
    FILTERING_STATUS = { path: 'filtering/status', method: 'GET' };
    FILTERING_ENABLE = { path: 'filtering/enable', method: 'POST' };
    FILTERING_DISABLE = { path: 'filtering/disable', method: 'POST' };
    FILTERING_ADD_FILTER = { path: 'filtering/add_url', method: 'PUT' };
    FILTERING_REMOVE_FILTER = { path: 'filtering/remove_url', method: 'DELETE' };
    FILTERING_SET_RULES = { path: 'filtering/set_rules', method: 'PUT' };
    FILTERING_ENABLE_FILTER = { path: 'filtering/enable_url', method: 'POST' };
    FILTERING_DISABLE_FILTER = { path: 'filtering/disable_url', method: 'POST' };
    FILTERING_REFRESH = { path: 'filtering/refresh', method: 'POST' };

    getFilteringStatus() {
        const { path, method } = this.FILTERING_STATUS;
        return this.makeRequest(path, method);
    }

    enableFiltering() {
        const { path, method } = this.FILTERING_ENABLE;
        return this.makeRequest(path, method);
    }

    disableFiltering() {
        const { path, method } = this.FILTERING_DISABLE;
        return this.makeRequest(path, method);
    }

    // TODO find out when to use force parameter
    refreshFilters() {
        const { path, method } = this.FILTERING_REFRESH;
        return this.makeRequest(path, method);
    }

    addFilter(url) {
        const { path, method } = this.FILTERING_ADD_FILTER;
        const parameter = 'url';
        const requestBody = `${parameter}=${url}`;
        const config = {
            data: requestBody,
            header: { 'Content-Type': 'text/plain' },
        };
        return this.makeRequest(path, method, config);
    }

    removeFilter(url) {
        const { path, method } = this.FILTERING_REMOVE_FILTER;
        const parameter = 'url';
        const requestBody = `${parameter}=${url}`;
        const config = {
            data: requestBody,
            header: { 'Content-Type': 'text/plain' },
        };
        return this.makeRequest(path, method, config);
    }

    setRules(rules) {
        const { path, method } = this.FILTERING_SET_RULES;
        const parameters = {
            data: rules,
            headers: { 'Content-Type': 'text/plain' },
        };
        return this.makeRequest(path, method, parameters);
    }

    enableFilter(url) {
        const { path, method } = this.FILTERING_ENABLE_FILTER;
        const parameter = 'url';
        const requestBody = `${parameter}=${url}`;
        const config = {
            data: requestBody,
            header: { 'Content-Type': 'text/plain' },
        };
        return this.makeRequest(path, method, config);
    }

    disableFilter(url) {
        const { path, method } = this.FILTERING_DISABLE_FILTER;
        const parameter = 'url';
        const requestBody = `${parameter}=${url}`;
        const config = {
            data: requestBody,
            header: { 'Content-Type': 'text/plain' },
        };
        return this.makeRequest(path, method, config);
    }

    // Parental
    PARENTAL_STATUS = { path: 'parental/status', method: 'GET' };
    PARENTAL_ENABLE = { path: 'parental/enable', method: 'POST' };
    PARENTAL_DISABLE = { path: 'parental/disable', method: 'POST' };

    getParentalStatus() {
        const { path, method } = this.PARENTAL_STATUS;
        return this.makeRequest(path, method);
    }

    enableParentalControl() {
        const { path, method } = this.PARENTAL_ENABLE;
        const parameter = 'sensitivity=TEEN'; // this parameter TEEN is hardcoded
        const config = {
            data: parameter,
            headers: { 'Content-Type': 'text/plain' },
        };
        return this.makeRequest(path, method, config);
    }

    disableParentalControl() {
        const { path, method } = this.PARENTAL_DISABLE;
        return this.makeRequest(path, method);
    }

    // Safebrowsing
    SAFEBROWSING_STATUS = { path: 'safebrowsing/status', method: 'GET' };
    SAFEBROWSING_ENABLE = { path: 'safebrowsing/enable', method: 'POST' };
    SAFEBROWSING_DISABLE = { path: 'safebrowsing/disable', method: 'POST' };

    getSafebrowsingStatus() {
        const { path, method } = this.SAFEBROWSING_STATUS;
        return this.makeRequest(path, method);
    }

    enableSafebrowsing() {
        const { path, method } = this.SAFEBROWSING_ENABLE;
        return this.makeRequest(path, method);
    }

    disableSafebrowsing() {
        const { path, method } = this.SAFEBROWSING_DISABLE;
        return this.makeRequest(path, method);
    }

    // Safesearch
    SAFESEARCH_STATUS = { path: 'safesearch/status', method: 'GET' };
    SAFESEARCH_ENABLE = { path: 'safesearch/enable', method: 'POST' };
    SAFESEARCH_DISABLE = { path: 'safesearch/disable', method: 'POST' };

    getSafesearchStatus() {
        const { path, method } = this.SAFESEARCH_STATUS;
        return this.makeRequest(path, method);
    }

    enableSafesearch() {
        const { path, method } = this.SAFESEARCH_ENABLE;
        return this.makeRequest(path, method);
    }

    disableSafesearch() {
        const { path, method } = this.SAFESEARCH_DISABLE;
        return this.makeRequest(path, method);
    }
}