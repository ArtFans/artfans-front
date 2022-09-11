const errorCatch = (error: any, callback?: any) => {
  const { kind } = JSON.parse(error.message);

  switch (kind.ExecutionError) {
    case 'Smart contract panicked: Fee was not charged':
      return callback;

    default:
      console.log(error);
  }
}

export default errorCatch;
