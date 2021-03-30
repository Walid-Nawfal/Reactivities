using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application
{
    public class Details
    {
        public class Query : IRequest<Result<Activity>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public DataContext Context { get; }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // we can do 
                // var activity = await _context.Activities.FindAsync(request.Id);
                // if(activity == null) throw new Exception("Activity not found");
                // we are doing this because we can't say if(activity == null) return NotFound() because we aren't in an API controller
                // but the whole logic of dealing with the error is heavy because of using exception
                // so it is preferred not to do so

                var activity = await _context.Activities.FindAsync(request.Id);
                return Result<Activity>.Success(activity);
            }
        }
    }
}