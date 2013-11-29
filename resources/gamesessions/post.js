this.state = 'started';
this.timestart = new Date().getTime();

emit('session:start', this);